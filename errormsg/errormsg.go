package errormsg

import (
	"encoding/json"
	"reflect"
)

type Error struct {
	ErrorCode    int    `json:"errorCode"`
	ErrorMessage string `json:"errorMessage"`

	// Err          string `json:"error`
}

func (this *Error) ToBytes() []byte {
	jsondata, _ := json.Marshal(this)
	return jsondata
}

// func (this *Error) ToBytesWithError(err string) []byte {
// 	this.Err = err
// 	jsondata, _ := json.Marshal(this)
// 	return jsondata
// }

func (this *Error) ToBytesWithStruct(obj interface{}) []byte {
	m := map[string]interface{}{}
	obj1 := reflect.TypeOf(obj)
	obj2 := reflect.ValueOf(obj)

	for i := 0; i < obj1.NumField(); i++ {
		m[obj1.Field(i).Name] = obj2.Field(i).Interface()
	}

	json.Unmarshal(this.ToBytes(), &m)
	for k, v := range m {
		m[k] = v
	}
	b, err := json.Marshal(m)
	if err != nil {
		return nil
	}
	return b
}

func (this *Error) ToBytesWithObject(v map[string]interface{}) []byte {
	m := map[string]interface{}{}
	json.Unmarshal(this.ToBytes(), &m)
	for k, v := range v {
		m[k] = v
	}
	b, err := json.Marshal(m)
	if err != nil {
		return nil
	}
	return b
}

func (this *Error) MustWithObject(v map[string]interface{}) map[string]interface{} {
	m := map[string]interface{}{}

	json.Unmarshal(this.ToBytes(), &m)
	for k, v := range v {
		m[k] = v
	}

	return m
}

// SUCCESS ...
var SUCCESS = Error{
	ErrorCode:    0,
	ErrorMessage: "成功",
}

// ErrorParam ...
var ErrorParam = Error{
	ErrorCode:    1000,
	ErrorMessage: "Read param fail",
}

// ErrorInsertSQL ...
var ErrorInsertSQL = Error{
	ErrorCode:    1001,
	ErrorMessage: "Insert SQL fail",
}

// ErrorQuerySQL ...
var ErrorQuerySQL = Error{
	ErrorCode:    1001,
	ErrorMessage: "Query SQL fail",
}

// ErrorEmpty ...
var ErrorEmpty = Error{
	ErrorCode:    1002,
	ErrorMessage: "Key Store is empty, try again later",
}

// ErrorParsingJSON ...
var ErrorParsingJSON = Error{
	ErrorCode:    1003,
	ErrorMessage: "json格式錯誤",
}

// ErrorCheckSum ...
var ErrorCheckSum = Error{
	ErrorCode:    1004,
	ErrorMessage: "CheckSum驗證錯誤",
}

// ErrorDelAccount ...
var ErrorDelAccount = Error{
	ErrorCode:    1005,
	ErrorMessage: "刪除帳號失敗",
}
