package apiagent

import (
	"encoding/json"
	"komicaRG/database"
	"komicaRG/errormsg"
	"log"
	"strings"

	"github.com/valyala/fasthttp"
)

// ReportPost get the post
func ReportPost(ctx *fasthttp.RequestCtx) {
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

	var report report
	if err := json.Unmarshal(ctx.PostBody(), &report); err != nil {
		jsonfail := errormsg.ErrorParsingJSON
		ctx.Write(jsonfail.ToBytes())
		logs.Content = jsonfail.ErrorMessage
		logs.InserSQL()
		return
	}

	if report.Content == "" {
		jsonfail := errormsg.ErrorReportEmpty
		ctx.Write(jsonfail.ToBytes())
		logs.Content = jsonfail.ErrorMessage
		logs.InserSQL()
		return
	}

	_, err := database.DB.Exec("INSERT INTO `reports` (`ip`,`reason`,`contents`,`report_post_id`) VALUES(?,?,?,?)", ip, report.Reason, report.Content, report.ID)
	if err != nil {
		log.Println("insert the sql fail, err: ", err)
		sqlfail := errormsg.ErrorInsertSQL
		ctx.Write(sqlfail.ToBytes())
		return
	}

	success := errormsg.SUCCESS

	ctx.Write(success.ToBytes())
}
