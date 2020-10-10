package apiagent

import (
	"komicaRG/database"
	"komicaRG/errormsg"
	"log"

	"github.com/valyala/fasthttp"
)

// ThreadCount get the post
func ThreadCount(ctx *fasthttp.RequestCtx) {

	//查詢資料
	rows, err := database.DB.Query("SELECT COUNT(*) FROM `posts` where parent_post IS NULL")
	if err != nil {
		log.Println(err)
		rowfail := errormsg.ErrorQuerySQL
		ctx.Write(rowfail.ToBytes())
		return
	}
	var count struct {
		Count int `json:"count"`
	}

	for rows.Next() {
		if err := rows.Scan(&count.Count); err != nil {
			log.Println(err)
		}
	}
	rows.Close()

	success := errormsg.SUCCESS
	ctx.Write(success.ToBytesWithStruct(count))
}
