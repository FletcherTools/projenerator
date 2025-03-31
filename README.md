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
You can use blockName and pluralBlockName variables
```handlebars
{{blockName}}
{{pluralBlockName}}
```
You can use lower, capital, upper and snake helpers to transform passed variables
```handlebars
{{lower blockName}}
{{capital blockName}}
{{upper blockName}}
{{snake blockName}}
```

### Usage
```
# projenerator create block-type block-name plural-block-name
projenerator create component example examples
```
