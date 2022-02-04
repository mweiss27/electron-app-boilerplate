module.exports = [
  [
    "use-babel-config",
    {
      presets: ["react-app"],
      plugins: [
        "react-require",
        [
          "module-resolver",
          {
            root: ".",
            alias: {
              "@common": "../common",
            },
          },
        ],
      ],
    },
  ],
]
