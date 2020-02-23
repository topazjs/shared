module.exports = {
    plugins: [],
    resolve: {
        // File extensions. Add others and needed (e.g. scss, json)
        extensions: [
            ".js",
            // ".jsx"
        ],
        modules: [ "node_modules" ],
        // Aliases help with shortening relative paths
        // 'Components/button' === '../../../components/button'
        // alias: {
        //     Components: path.resolve(paths.appSrc, "components"),
        //     Containers: path.resolve(paths.appSrc, "containers"),
        //     Utils: path.resolve(paths.appSrc, "utils")
        // }
    },
    module: {
        rules: [
            {
                test: /\.(png|svg|jpg)$/,
                use: [ "file-loader" ]
            }
        ]
    }
};
