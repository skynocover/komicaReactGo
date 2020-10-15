package main

import (
	"fmt"
	"komicaRG/apiagent"
	"komicaRG/config"
	"komicaRG/database"

	"github.com/buaazp/fasthttprouter"
	"github.com/valyala/fasthttp"
)

func main() {
	{
		config.InitConfig()
		if err := database.DBconn(); err != nil {
			panic(err)
		}
	}

	router := fasthttprouter.New()
	router.NotFound = fasthttp.FSHandler("./react/build", 0)
	router.POST("/thread/post", apiagent.ThreadPost)
	router.GET("/thread/get", apiagent.ThreadGet)
	router.GET("/thread/take", apiagent.ThreadTake)
	router.POST("/report/post", apiagent.ReportPost)
	if err := fasthttp.ListenAndServe(":"+config.Config.Server.Listen, router.Handler); err != nil {
		fmt.Println("start fasthttp fail:", err.Error())
	}
}
