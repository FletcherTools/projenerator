# Projenerator
### 1. Create a config file
projenerator/config.json
```
{
  "templatesDir": "./templates"
}
```
### 2. Add templates
Create handlebars templates.\
You can use moduleName and pluralModuleName variables
```handlebars
{{moduleName}}
{{pluralModuleName}}
```
You can use lower, capital, upper and snake helpers to transform passed variables
```handlebars
{{lower moduleName}}
{{capital moduleName}}
{{upper moduleName}}
{{snake moduleName}}
```

### Usage
```
# projenerator module module-name plural-module-name
projenerator module example examples
```
