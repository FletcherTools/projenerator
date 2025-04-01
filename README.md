# Projenerator

### 1. Create a config file
`projenerator/config.json`
```
{
  "templatesDir": "./templates",
  "targetDir": "../src",
}
```

### 2. Add templates
Create handlebars templates.\
You can use entityName and entityNamePlural variables
```handlebars
{{entityName}}
{{entityNamePlural}}
```
You can use upper, camel, pascal, kebab and snake helpers to transform passed variables
```handlebars
{{camel entityName}} // entityName
{{pascal entityName}} // EntityName
{{kebab entityName}} // entity-name
{{snake entityName}} // entity_name
{{upper entityName}} // ENTITY-NAME
{{upper (snake entityName)}} // ENTITY_NAME
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
