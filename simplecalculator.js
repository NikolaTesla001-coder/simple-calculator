 const resultDisplay = document.getElementById("result");
        let kernel = [];

        const updateDisplay = () => {
            resultDisplay.innerHTML = kernel.join("") || "0";
        };

        const calculateResult = () => {
            try {
                const expression = kernel.join("").replace("×", "*");
                const evaluated = eval(expression);
                resultDisplay.innerHTML = evaluated;
                kernel = [String(evaluated)];
            } catch {
                resultDisplay.innerHTML = "Error";
                kernel = [];
            }
        };

        const handleInput = (input) => {
            if (input === "=") {
                calculateResult();
            }
            else if (input === "+/-") {
                if (kernel.length > 0) {
                    if (kernel[0] === "-") {
                        kernel.shift();
                    } else {
                        kernel.unshift("-");
                    }
                }
                updateDisplay();
            
            } 
            else if(input === "C"){
                kernel.length=0;
                updateDisplay();

            }
            else if(input==="X"){
                kernel.pop();
                updateDisplay();
            }
            else if(input==="%"){
                 kernel.push('%');
                 updateDisplay();
                 const expression = kernel.join("").replace("×", "*").replace("%","*0.01");
                const evaluated = eval(expression);
                // resultDisplay.innerHTML = evaluated;
                kernel = [String(evaluated)];

                  
            }
            else {
                kernel.push(input);
                updateDisplay();
            }
        };

        document.querySelectorAll("button").forEach((btn) => {
            btn.addEventListener("click", () => {
                handleInput(btn.innerText);
            });
        });

        document.addEventListener("keydown", (e) => {
            const validKeys = "1234567890+-*/.".split("");
            if (validKeys.includes(e.key)) {
                handleInput(e.key);
            } else if (e.key === "Enter") {
                calculateResult();
            } else if (e.key === "Backspace") {
                kernel.pop();
                updateDisplay();
            }
        });

        updateDisplay();