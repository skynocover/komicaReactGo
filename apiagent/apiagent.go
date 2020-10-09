package apiagent

type post struct {
	Title   string  `json:"title"`
	Image   string  `json:"image"`
	WithImg bool    `json:"withImage"`
	Name    string  `json:"name"`
	Content string  `json:"content"`
	Parent  *string `json:"parent"`
	Sage    bool    `json:"sage"`
}

type report struct {
	Reason  string `json:"reason"`
	Content string `json:"content"`
}
