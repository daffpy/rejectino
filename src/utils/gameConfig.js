export const buttonLevels = {
    0: {
        type: "normal",
        class: ["scale-100", "scale-90", "scale-80", "scale-75", "scale-50", "scale-30", "scale-20", "scale-10", "scale-100"],
    },
    1:{
        type: "movearound",
        class: ["invisible hover:visible"]
    },
    2:{
        type: "motion",
        animate: {
            x: [0, -300, 0],
            y: [0]
        },
        speedMultiplyer: [1],
    },
    3:{
        type: "darkness"
    },
    4:{
        type: "tictactoe"
    },

    

}