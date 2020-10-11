package apiagent

import (
	"encoding/json"
	"fmt"
	"hash/crc32"
	"komicaRG/database"
	"komicaRG/errormsg"
	"log"
	"strings"

	"github.com/valyala/fasthttp"
)

// ThreadPost get the post
func ThreadPost(ctx *fasthttp.RequestCtx) {

	ip := func() string {
		clientIP := string(ctx.Request.Header.Peek("X-Forwarded-For"))
		if index := strings.IndexByte(clientIP, ','); index >= 0 {
			clientIP = clientIP[0:index]
		}
		clientIP = strings.TrimSpace(clientIP)
		if len(clientIP) > 0 {
			return clientIP
		}
		clientIP = strings.TrimSpace(string(ctx.Request.Header.Peek("X-Real-Ip")))
		if len(clientIP) > 0 {
			return clientIP
		}
		return ctx.RemoteIP().String()
	}()

	logs := database.Log{
		IP: ip,
	}

	var post post
	if err := json.Unmarshal(ctx.PostBody(), &post); err != nil {
		jsonfail := errormsg.ErrorParsingJSON
		ctx.Write(jsonfail.ToBytes())
		failreason := fmt.Sprintf("ip:%s post json fail, err:%s", ip, err)
		logs.Content = failreason
		logs.InserSQL()
		return
	}

	if (post.Title == "" && post.Parent == nil) || post.Content == "" {
		jsonfail := errormsg.ErrorParamEmpty
		ctx.Write(jsonfail.ToBytes())
		logs.Content = jsonfail.ErrorMessage
		logs.InserSQL()
		return
	}

	if (post.Image == "" && post.WithImg) || (post.Image != "" && !post.WithImg) {
		jsonfail := errormsg.ErrorParamImage
		ctx.Write(jsonfail.ToBytes())
		logs.Content = jsonfail.ErrorMessage
		logs.InserSQL()
		return
	}

	if post.Name == "" {
		post.Name = "某個懶得打名稱的人"
	}

	shaip := fmt.Sprintf("%x\n", crc32.ChecksumIEEE([]byte(ip)))

	_, err := database.DB.Exec("INSERT INTO `posts` (`poster_id`, `title`, `name`, `content`, `imageurl`, `withimg`, `parent_post`, `sage`,`ip`) VALUES(?,?,?,?,?,?,?,?,?)", shaip, post.Title, post.Name, post.Content, post.Image, post.WithImg, post.Parent, post.Sage, ip)
	if err != nil {
		log.Println("insert the sql fail, err: ", err)
		sqlfail := errormsg.ErrorInsertSQL
		ctx.Write(sqlfail.ToBytes())
		return
	}

	if !post.Sage {
		_, err := database.DB.Exec("UPDATE `posts` SET replytime=NOW() WHERE posts.id=?", post.Parent)
		if err != nil {
			log.Println("insert the sql fail, err: ", err)
			sqlfail := errormsg.ErrorInsertSQL
			ctx.Write(sqlfail.ToBytes())
			return
		}
	}

	success := errormsg.SUCCESS

	ctx.Write(success.ToBytes())
}
