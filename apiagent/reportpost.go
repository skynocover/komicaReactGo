package apiagent

import (
	"encoding/json"
	"komicaRG/database"
	"komicaRG/errormsg"
	"log"

	"github.com/valyala/fasthttp"
)

// ReportPost get the post
func ReportPost(ctx *fasthttp.RequestCtx) {
	var report report
	if err := json.Unmarshal(ctx.PostBody(), &report); err != nil {
		jsonfail := errormsg.ErrorParsingJSON
		ctx.Write(jsonfail.ToBytes())
		return
	}

	if report.Content == "" {
		log.Println("post fail")
		jsonfail := errormsg.ErrorParam
		ctx.Write(jsonfail.ToBytes())
		return
	}

	ip := ctx.RemoteIP()

	_, err := database.DB.Exec("INSERT INTO `reports` (`ip`,`reason`,`contents`) VALUES(?,?,?)", ip, report.Reason, report.Content)
	if err != nil {
		log.Println("insert the sql fail, err: ", err)
		sqlfail := errormsg.ErrorInsertSQL
		ctx.Write(sqlfail.ToBytes())
		return
	}

	success := errormsg.SUCCESS

	ctx.Write(success.ToBytes())

}
