package main

import (
	"fmt"
	"komicaRG/apiagent"
	"komicaRG/config"
	"komicaRG/database"

	"github.com/buaazp/fasthttprouter"
	"github.com/valyala/fasthttp"
)

func httpHandle(ctx *fasthttp.RequestCtx) {
	fmt.Fprintf(ctx, "hello fasthttp")
}

func main() {
	{
		config.InitConfig()
		if err := database.DBconn(); err != nil {
			panic(err)
		}
	}

	// log.Println(config.Config)

	router := fasthttprouter.New()
	router.NotFound = fasthttp.FSHandler("./react/build", 0)
	router.POST("/thread/post", apiagent.ThreadPost)
	router.GET("/thread/get", apiagent.ThreadGet)
	router.POST("/report/post", apiagent.ReportPost)
	// router.GET("/api/thread", apiagent.ReadThread)
	if err := fasthttp.ListenAndServe(":"+config.Config.Server.Listen, router.Handler); err != nil {
		fmt.Println("start fasthttp fail:", err.Error())
	}
}
