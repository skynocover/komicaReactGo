package apiagent

import (
	"github.com/valyala/fasthttp"
)

// ThreadTake get the post only one thread
func ThreadTake(ctx *fasthttp.RequestCtx) {
	// ip := func() string {
	// 	clientIP := string(ctx.Request.Header.Peek("X-Forwarded-For"))
	// 	if index := strings.IndexByte(clientIP, ','); index >= 0 {
	// 		clientIP = clientIP[0:index]
	// 	}
	// 	clientIP = strings.TrimSpace(clientIP)
	// 	if len(clientIP) > 0 {
	// 		return clientIP
	// 	}
	// 	clientIP = strings.TrimSpace(string(ctx.Request.Header.Peek("X-Real-Ip")))
	// 	if len(clientIP) > 0 {
	// 		return clientIP
	// 	}
	// 	return ctx.RemoteIP().String()
	// }()

	// logs := database.Log{
	// 	IP: ip,
	// }

	// success := errormsg.SUCCESS
	// ctx.Write(success.ToBytesWithStruct(threads))
}
