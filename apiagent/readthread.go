package apiagent

import (
// "github.com/99designs/gqlgen/graphql/handler"
// "github.com/99designs/gqlgen/graphql/playground"
)

// // ReadThread from database
// func ReadThread(ctx *fasthttp.RequestCtx) {
// 	h := playground.Handler("GraphQL", "/query")

// 	return func(c *gin.Context) {
// 		h.ServeHTTP(c.Writer, c.Request)
// 	}
// }

// // // Defining the Graphql handler
// // func graphqlHandler() gin.HandlerFunc {
// // 	// NewExecutableSchema and Config are in the generated.go file
// // 	// Resolver is in the resolver.go file
// // 	h := handler.NewDefaultServer(NewExecutableSchema(Config{Resolvers: &Resolver{}}))

// // 	return func(c *gin.Context) {
// // 		h.ServeHTTP(c.Writer, c.Request)
// // 	}
// // }
