const path = require("path") // permet de créer des chemins absolus à partir des chemins relatifs car webpack attend à certains endroits des chemins absolus
module.exports = {
    watch: true,
    entry: ["babel-polyfill", "./src/script.js"], // dit à webpack le point d'entrée de notre projet
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js" // dit à webpack le nom du fichier produit
    },
    devServer: {
        contentBase: path.resolve(__dirname, "dist"), // dit au serveur de nous servir ce qu'il y a dans le dossier dist au lieu de la racine du projet
        open: true // lance le navigateur automatiquement au lancement du serveur, ce qui évite de mettre --open dans la tâche
    },
    module: {
        rules: [
            {
                // on teste si c'est un fichier JS
                test: /\.js$/,
                // on ne traite pas les fichiers dans node_modules
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["env"]
                    }
                }
            }
        ]
    }
}