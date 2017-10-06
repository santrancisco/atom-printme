#### Wtf is this?

A modified version of the helloworld plugin to do simple tasks:

- Get the setting for the text we want to insert and replace
- Get the selected text
- Replace it to {{varname}} in the configured text and insert it into document with right indentation

The default is set to Golang fmt.Println cause i'm trying to understand some golang code:
```
fmt.Println('>>>>>>>>>>>  {{varname}} :')
fmt.Println({{varname}})
```


![printme](printme.gif?raw=true)
