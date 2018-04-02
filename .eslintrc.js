module.exports = {
    "env": {
        "browser": true,
        "node": true
    },
    "globals": {
        "document": false
    },
    "extends": ["airbnb", "plugin:prettier/recommended"],
    "rules":{
        "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }]
        
    }
};