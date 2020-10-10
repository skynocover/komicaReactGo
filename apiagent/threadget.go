package apiagent

import (
	"komicaRG/database"
	"komicaRG/errormsg"
	"log"
	"strconv"

	"github.com/valyala/fasthttp"
)

// ThreadGet get the post
func ThreadGet(ctx *fasthttp.RequestCtx) {

	page, err := strconv.Atoi(string(ctx.FormValue("page")))
	if err != nil {
		valuefail := errormsg.ErrorParam
		ctx.Write(valuefail.ToBytes())
		return
	}

	var threads struct {
		Threads []database.Thread
	}

	//查詢資料
	rows, err := database.DB.Query("SELECT `id`,`poster_id`, `title`, `name`, `content`, `imageurl`, `withimg`,`time` FROM `posts` where parent_post IS NULL ORDER BY replytime Desc limit ?,10", (page-1)*10)
	if err != nil {
		log.Println(err)
		rowfail := errormsg.ErrorQuerySQL
		ctx.Write(rowfail.ToBytes())
		return
	}

	for rows.Next() {
		var thread database.Thread
		err := rows.Scan(&thread.ID, &thread.PosterID, &thread.Title, &thread.Name, &thread.Content, &thread.Image, &thread.WithImg, &thread.Time)
		if err != nil {
			log.Println(err)
		}
		threads.Threads = append(threads.Threads, thread)
	}
	rows.Close()

	for i := range threads.Threads {
		//查詢資料
		rows, err := database.DB.Query("SELECT `id`,`poster_id`, `name`, `content`, `imageurl`, `withimg`, `parent_post`,`sage`,`time` FROM `posts` where parent_post=?", threads.Threads[i].ID)
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
			threads.Threads[i].Reply = append(threads.Threads[i].Reply, reply)
		}
		rows.Close()
	}

	success := errormsg.SUCCESS
	ctx.Write(success.ToBytesWithStruct(threads))
}
