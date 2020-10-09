package apiagent

import (
	"komicaRG/database"
	"komicaRG/errormsg"
	"log"

	"github.com/valyala/fasthttp"
)

// ThreadGet get the post
func ThreadGet(ctx *fasthttp.RequestCtx) {

	var threads struct {
		Threads []database.Thread
	}

	//查詢資料
	rows, err := database.DB.Query("SELECT `id`,`poster_id`, `title`, `name`, `content`, `imageurl`, `withimg`,`time` FROM `posts` where parent_post IS NULL ORDER BY id Desc")
	if err != nil {
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

	log.Println(threads)

	ctx.Write(success.ToBytesWithStruct(threads))
}
