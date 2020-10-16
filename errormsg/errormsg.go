package errormsg

import (
	"encoding/json"
	"reflect"
)

// Error ...
type Error struct {
	ErrorCode    int    `json:"errorCode"`
	ErrorMessage string `json:"errorMessage"`

	// Err          string `json:"error`
}

// ToBytes ...
func (errs *Error) ToBytes() []byte {
	jsondata, _ := json.Marshal(errs)
	return jsondata
}

// func (this *Error) ToBytesWithError(err string) []byte {
// 	this.Err = err
// 	jsondata, _ := json.Marshal(this)
// 	return jsondata
// }

// ToBytesWithStruct ...
func (errs *Error) ToBytesWithStruct(obj interface{}) []byte {
	m := map[string]interface{}{}
	obj1 := reflect.TypeOf(obj)
	obj2 := reflect.ValueOf(obj)

	for i := 0; i < obj1.NumField(); i++ {
		m[obj1.Field(i).Name] = obj2.Field(i).Interface()
	}

	json.Unmarshal(errs.ToBytes(), &m)
	for k, v := range m {
		m[k] = v
	}
	b, err := json.Marshal(m)
	if err != nil {
		return nil
	}
	return b
}

// ToBytesWithObject ...
func (errs *Error) ToBytesWithObject(v map[string]interface{}) []byte {
	m := map[string]interface{}{}
	json.Unmarshal(errs.ToBytes(), &m)
	for k, v := range v {
		m[k] = v
	}
	b, err := json.Marshal(m)
	if err != nil {
		return nil
	}
	return b
}

// MustWithObject ...
func (errs *Error) MustWithObject(v map[string]interface{}) map[string]interface{} {
	m := map[string]interface{}{}

	json.Unmarshal(errs.ToBytes(), &m)
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
	ErrorCode:    1002,
	ErrorMessage: "Query SQL fail",
}

// ErrorDecrypt ...
var ErrorDecrypt = Error{
	ErrorCode:    1003,
	ErrorMessage: "Decrypt fail",
}

// ErrorParsingJSON ...
var ErrorParsingJSON = Error{
	ErrorCode:    1003,
	ErrorMessage: "json格式錯誤",
}

// ErrorParamEmpty ...
var ErrorParamEmpty = Error{
	ErrorCode:    2000,
	ErrorMessage: "標題或內文不可空白",
}

// ErrorParamImage ...
var ErrorParamImage = Error{
	ErrorCode:    2001,
	ErrorMessage: "附圖請符合勾選規則",
}

// ErrorReportEmpty ...
var ErrorReportEmpty = Error{
	ErrorCode:    2002,
	ErrorMessage: "回報內容不可空白",
}

// ErrorPostImg ...
var ErrorPostImg = Error{
	ErrorCode:    2003,
	ErrorMessage: "附圖網址無效",
}
