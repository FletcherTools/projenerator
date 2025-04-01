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
You can use entityName and entityNamePlural variables
```handlebars
{{entityName}}
{{entityNamePlural}}
```
You can use lower, capital, upper and snake helpers to transform passed variables
```handlebars
{{lower entityName}}
{{upper entityName}}
{{capital entityName}}
{{snake entityName}}
```

### Usage
```
# projenerator make entity-type entity-name
projenerator make component test-component
```

##### Options
```
projenerator make component person --plural=people --variant=extended --scope=features/user
```
