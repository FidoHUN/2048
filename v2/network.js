class NeuralNetwork{
    constructor(neuronCounts){
        this.levels = []
        for(let i=0;i<neuronCounts.length-1;i++){
            this.levels.push(new Level(neuronCounts[i], neuronCounts[i+1]))
        }
    }

    static feedForward(givenInputs,network){
        let outputs = Level.computeOutputValues(givenInputs, network.levels[0])
        for(let i=1;i<network.levels.length;i++){
            outputs = Level.computeOutputValues(outputs,network.levels[i])
        }
        return outputs
    }

    static mutate(network,amount=1){
        network.levels.forEach(level => {
            for(let i=0;i<level.biases.length;i++){
                level.biases[i] = lerp(level.biases[i],Math.random(),amount)
            }
            for(let i=0;i<level.weights.length;i++){
                for(let j=0;j<level.weights[i].length;j++){
                    level.weights[i][j] = lerp(level.weights[i][j],Math.random(),amount)
                }
            }
        })
    }
}

class Level{
    constructor(inputCount,outputCount){
        this.inputs = new Array(inputCount)
        this.outputs = new Array(outputCount)
        this.biases = new Array(outputCount)
        this.weights=[] // two dimensional array
        for(let i=0;i<inputCount;i++){
            this.weights[i]=new Array(outputCount)
        }
        // we dont have values yet, this is just a shell so fare
        //setting random weights and biases
        Level.#randomize(this)
        // the inputs will be coming from the cars sensors
        // we need to compute the outputs based on these numbers
    }

    static #randomize(level){
        for(let i=0;i<level.inputs.length;i++){
            for(let j=0;j<level.outputs.length;j++){
                level.weights[i][j] = Math.random()
            }
        }
        for(let i=0;i<level.biases.length;i++){
            level.biases[i] = Math.random()
        }
    }

    static computeOutputValues(givenInputs,level){
        // set inputs from sensor to the level inputs
        // or from prevous level outputs to the next level inputs
        for(let i=0;i<level.inputs.length;i++){
            level.inputs[i]=givenInputs[i]
        }
        let maxSum = 0;
        let maxIndex = 0;
        for(let i=0;i<level.outputs.length;i++){
            let sum = 0
            for(let j=0;j<level.inputs.length;j++){
                sum+=level.inputs[j]*level.weights[j][i]
            }
            // console.log('bias',level.biases[i])
            // console.log('sum',sum)
            // console.log('maxSum',maxSum)
            if(sum>level.biases[i]){
                if(sum>maxSum){
                    // level.outputs[i]=1
                    maxSum = sum
                    maxIndex = i;
                }
            }
        }
        level.outputs.fill(0)
        level.outputs[maxIndex]=1;
        return level.outputs;
    }
}