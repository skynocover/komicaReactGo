package apiagent

import (
	"komicaRG/database"
	"komicaRG/errormsg"
	"log"
	"strconv"
	"strings"

	"github.com/valyala/fasthttp"
)

// ThreadTake get the post only one thread
func ThreadTake(ctx *fasthttp.RequestCtx) {
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

	id, err := strconv.Atoi(string(ctx.FormValue("id")))
	if err != nil {
		valuefail := errormsg.ErrorParam
		ctx.Write(valuefail.ToBytes())
		logs.Content = valuefail.ErrorMessage
		logs.InserSQL()
		return
	}

	var threads struct {
		Threads []database.Thread
	}

	//查詢資料
	row := database.DB.QueryRow("SELECT `id`,`poster_id`, `title`, `name`, `content`, `imageurl`, `withimg`,`time` FROM `posts` where parent_post IS NULL AND id=?", id)
	if row == nil {
		queryfail := errormsg.ErrorParam
		ctx.Write(queryfail.ToBytes())
		return
	}

	var thread database.Thread
	err = row.Scan(&thread.ID, &thread.PosterID, &thread.Title, &thread.Name, &thread.Content, &thread.Image, &thread.WithImg, &thread.Time)
	if err != nil {
		log.Println(err)
	}
	threads.Threads = append(threads.Threads, thread)

	//查詢資料
	rows, err := database.DB.Query("SELECT `id`,`poster_id`, `name`, `content`, `imageurl`, `withimg`, `parent_post`,`sage`,`time` FROM `posts` where parent_post=?", threads.Threads[0].ID)
	if err != nil {
		rowfail := errormsg.ErrorQuerySQL
		ctx.Write(rowfail.ToBytes())
		return
	}

	for rows.Next() {
		var reply database.Reply
		err := rows.Scan(&reply.ID, &reply.PosterID, &reply.Name, &reply.Content, &reply.Image, &reply.WithImg, &reply.ParentPost, &reply.Sage, &reply.Time)
		if err != nil {
			log.Println(err)
		}
		threads.Threads[0].Reply = append(threads.Threads[0].Reply, reply)
	}
	rows.Close()

	success := errormsg.SUCCESS
	ctx.Write(success.ToBytesWithStruct(threads))
}
