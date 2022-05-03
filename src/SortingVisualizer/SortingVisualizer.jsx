import React from 'react';
import {getMergeSortAnimations} from '../sortingAlgorithms/sortingAlgorithms.js';
import 'C:/Users/Karansinh Zala/sort-project/src/SortingVisualizer/SortingVisualizer.css';

// Change this value for the speed of the animations.
const ANIMATION_SPEED_MS = 3;

// Change this value for the number of bars (value) in the array.
const NUMBER_OF_ARRAY_BARS = 301;

// This is the main color of the array bars.
const PRIMARY_COLOR = '#009E00';

// This is the color of array bars that are being compared throughout the animations.

const SECONDARY_COLOR = 'red';
export default class SortingVisualizer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            array: [],
        };
    }

    componentDidMount() {
        this.resetArray();
    }

    resetArray() {
        const array = [];

        for(let i=0;i<NUMBER_OF_ARRAY_BARS;i++) {
            array.push(randomInt());
        }

        this.setState({array});
    }

    mergeSort() {
        const animations = getMergeSortAnimations(this.state.array);
        for (let i = 0; i < animations.length; i++) {
          const arrayBars = document.getElementsByClassName('array-bar');
          const isColorChange = i % 3 !== 2;
          if (isColorChange) {
            const [barOneIdx, barTwoIdx] = animations[i];
            const barOneStyle = arrayBars[barOneIdx].style;
            const barTwoStyle = arrayBars[barTwoIdx].style;
            const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
            setTimeout(() => {
              barOneStyle.backgroundColor = color;
              barTwoStyle.backgroundColor = color;
            }, i * ANIMATION_SPEED_MS);
          } else {
            setTimeout(() => {
              const [barOneIdx, newHeight] = animations[i];
              const barOneStyle = arrayBars[barOneIdx].style;
              barOneStyle.height = `${0.58*newHeight}px`;
            }, i * ANIMATION_SPEED_MS);
          }
        }
      }

    render() {
        const {array} = this.state;
    
        return (
          <div className="array-container" style={{backgroundColor: '#312A6C'}}>
            {array.map((value, idx) => (
              <div
                className="array-bar"
                key={idx}
                style={{
                  backgroundColor: PRIMARY_COLOR,
                  height: `${0.58*value}px`,
                }}></div>
            ))}
            <button style ={{backgroundColor: '#ED1C24', margin : '10px', fontFamily : 'Fantasy'}} onClick={() => this.resetArray()}>Generate New Array</button>
            <button style ={{backgroundColor: '#ED1C24', fontFamily : 'Fantasy'}} onClick={() => this.mergeSort()}>Merge Sort</button>
          </div>
        );
      }
}

function randomInt() {
    return Math.floor(((Math.random() * 1000) % 1000) + 5);
}