package aes

import (
	"crypto/aes"
	"crypto/cipher"
	"crypto/rand"
	"encoding/hex"
	"errors"
	"io"
)

// EncryptString Encode with string
func EncryptString(plaintext string, commonkey []byte) (string, error) {
	block, err := aes.NewCipher(commonkey)
	if err != nil {
		return "", err
	}

	ciphertext := make([]byte, aes.BlockSize+len(plaintext))
	iv := ciphertext[:aes.BlockSize]
	if _, err := io.ReadFull(rand.Reader, iv); err != nil {
		return "", err
	}

	stream := cipher.NewCFBEncrypter(block, iv)
	stream.XORKeyStream(ciphertext[aes.BlockSize:], []byte(plaintext))

	return hex.EncodeToString(ciphertext), nil
}

// DecryptString Decode with string
func DecryptString(d string, commonkey []byte) (string, error) {

	ciphertext, err := hex.DecodeString(d)
	if err != nil {
		return "", err
	}

	block, err := aes.NewCipher(commonkey)
	if err != nil {
		return "", err
	}

	if len(ciphertext) < aes.BlockSize {
		return "", errors.New("ciphertext too short")
	}

	iv := ciphertext[:aes.BlockSize]
	ciphertext = ciphertext[aes.BlockSize:]

	stream := cipher.NewCFBDecrypter(block, iv)
	stream.XORKeyStream(ciphertext, ciphertext)

	return string(ciphertext), nil
}

// Decrypt Decode with byte
func Decrypt(encrypted []byte, key []byte) ([]byte, error) {
	dst := make([]byte, len(encrypted))
	n, err := hex.Decode(dst, encrypted)
	if err != nil {
		return nil, err
	}
	dst = dst[:n]

	block, err := aes.NewCipher(key)
	if err != nil {
		return nil, err
	}

	if len(dst) < aes.BlockSize {
		return nil, errors.New("ciphertext too short")
	}

	iv := dst[:aes.BlockSize]
	ciphertext := dst[aes.BlockSize:]

	stream := cipher.NewCFBDecrypter(block, iv)
	stream.XORKeyStream(ciphertext, ciphertext)

	return ciphertext, nil
}

// IVDecrypt 解開IV後解密
func IVDecrypt(encrypted []byte, key []byte) (decrypted []byte, err error) {
	if len(encrypted) < 16 {
		err = errors.New("encrypted too short")
		return
	}
	iv := encrypted[:16]
	encrypted = encrypted[16:]
	var block cipher.Block
	block, err = aes.NewCipher(key)
	if err != nil {
		return
	}
	if len(encrypted) < 0 {
		err = errors.New("ciphertext too short")
		return
	}

	stream := cipher.NewCFBDecrypter(block, iv)
	stream.XORKeyStream(encrypted, encrypted)
	return encrypted, nil
}
