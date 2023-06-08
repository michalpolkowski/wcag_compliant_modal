const config = {
    jest: {
        setupFilesAfterEnv: ["./jest.setup.js"],
        "moduleNameMapper": {
            "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/__mocks__/fileMock.js",
            "\\.(scss|sass|css)$": "identity-obj-proxy"
        },
        "transform": {
            "^.+\\.js$": "babel-jest",
            ".+\\.(css|styl|less|sass|scss)$": "jest-transform-css"
        }
    }
};

module.exports = config;
