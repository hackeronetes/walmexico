import React, { useState, useEffect } from 'react'
import { css, styled, setup } from 'goober'
import { MultiStepPropsBase } from './Interfaces'

setup(React.createElement)

const Ol = styled('ul')`
  margin-bottom: 30px;
  overflow: hidden;
  counter-reset: step;
  display: flex;
  justify-content: center;
`
const Li = styled('li')`
  list-style-type: none;
  color: white;
  text-transform: uppercase;
  font-size: 9px;
  float: left;
  position: relative;
  
 span{
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
 }
  &:hover,
  &:before {
    color: #0FA0CE;
  }
  &:after {
    content: '';
    width: 100%;
    height: 5px;
    background: #ccc;
    position: absolute;
    left: -50%;
    top: 10px;
    z-index: -1;
  }   
  &:before {
    content: counter(step);
    counter-increment: step;
    width: 25px;
    line-height: 23px;
    display: block;
    font-size: 16px;
    color: #ffffff;
    background: #ccc;
    border-radius: 20px;
    margin: 0 auto 5px auto;
    text-align: center;
  }
  
  .step-one:after {
    content: none !important;
  }
  
`
const Todo = css`
  &:before {
    color: #ffffff;
    background: #ccc;
  }
`
const Doing = css`
  &:before {
    color: #ffffff;
    background: #007dc6;  
  }
  &:after {
    background-color: #76c043;  
  }
`
const Done = css`
  &:before {
    color: white;
    background: #76c043;  
  }
  &:after {
    background-color: #76c043;  
  }
  
`

const RowDirection = css`
  flex-direction: row;
`

const ColumnDirection = css`
  margin-top: 4.8rem;
  flex-direction: column;
`

const getStep = (defaultIndex: number, newIndex: number, length: number): number => {
  if (newIndex <= length) {
    return newIndex;
  }
  return defaultIndex;
}

const getTopNavStyles = (indx: number, length: number): string[] => {
  const styles: string[] = []
  for (let i = 0; i < length; i++) {
    if (i < indx) {
      styles.push('done')
    } else if (i === indx) {
      styles.push('doing')
    } else {
      styles.push('todo')
    }
  }
  return styles
}

// const getButtonsState = (indx: number, length: number, isValidState: boolean) => {
//   if (indx > 0 && indx < length - 1) {
//     return {
//       showPrevBtn: true,
//       showNextBtn: isValidState ? true : false
//     }
//   } else if (indx === 0) {
//     return {
//       showPrevBtn: false,
//       showNextBtn: isValidState ? true : false
//     }
//   } else {
//     return {
//       showPrevBtn: true,
//       showNextBtn: false
//     }
//   }
// }

export default function MultiStep(props: MultiStepPropsBase) {
  const { children } = props

  let stepsArray = props.steps

  if (!stepsArray && !children) {
    throw TypeError("missing children or steps in props")
  }

  const [childIsValid, setChildIsValid] = useState(true)
  const setIsChildInValidState = (isValid: boolean) => setChildIsValid(isValid)

  const numberOfSteps = props.numberSteps

//   let currentActiveStep = 0
//   if(props.activeStep)
//      currentActiveStep = props.activeStep

  

  const [activeStep, setActiveStep] = useState(getStep(0, props.activeStep, numberOfSteps))

  
  const [stylesState, setStyles] = useState(getTopNavStyles(activeStep, numberOfSteps))
  // const [buttonsState, setButtons] = useState(getButtonsState(activeStep, numberOfSteps, childIsValid))
  

  const setStepState = (indx: number) => {
    setStyles(getTopNavStyles(indx, numberOfSteps))
    setActiveStep(indx < numberOfSteps ? indx : activeStep)
    // setButtons(getButtonsState(indx, numberOfSteps, isValidState))
  }


  const handleNextClick = () => {
    // setStepState(activeStep + 1)
    setStepState(activeStep + 1)
  }
  
  const handlePreviousClick = () => {
    // setStepState(activeStep + 1)
    setStepState(activeStep > 0 ? activeStep - 1 : activeStep)
  }


  let steps: any = []
  if (children) {
    
    let childrenWithProps = React.Children.map(children, (child) => {
      return React.cloneElement(child, {
        signalIfValid: setIsChildInValidState,
        handleNextClick: handleNextClick,
        handlePreviousClick: handlePreviousClick,
      })
    })
    // for backward compatibility we preserve 'steps' with components array:
    steps = childrenWithProps.map(childComponent => (
      {
        title: childComponent.props.title,
        component: childComponent,
        // handleNextClick: handleNextClick
      })
    )
    
  }
  else {
    steps = stepsArray
  }

  



  

  

  
 
  
  const stepCustomStyle = typeof props.stepCustomStyle === 'undefined' ? {} : props.stepCustomStyle
  // const showNavButtons = typeof props.showNavigation === 'undefined' ? true : props.showNavigation
  const showTitles = typeof props.showTitles === 'undefined' ? true : props.showTitles
  const directionType = typeof props.direction === 'undefined' ? 'row' : props.direction
 
  

  useEffect(() => {
    // setButtons(getButtonsState(activeStep, numberOfSteps, childIsValid))
  }, [activeStep, childIsValid])

  

  // const next = () => setStepState(activeStep + 1)
  // const previous = () => setStepState(activeStep > 0 ? activeStep - 1 : activeStep)

  

  const renderTopNav = () =>
    steps.map((s:any, i:any) => {
      return (
        <Li
          className={
            (i === 0 ? 'step-one ' : '') + 
            (
              stylesState[i] === 'todo' ? Todo : 
                stylesState[i] === 'doing' ? Doing :
                  Done
            )
            
          }
          
          style={{ ...stepCustomStyle }}
          key={i}
          value={i}
        >
          {showTitles}
        </Li>
      )
    }
    )

  // const renderButtonsNav = (show: boolean, prevButton?: NavButton, nextButton?: NavButton) =>
  //   show && (
  //     <div>
  //       <button onClick={previous}
  //         style={prevButton?.style}
  //         disabled={buttonsState.showPrevBtn ? false : true}>
  //         {prevButton && prevButton.title ? <>{prevButton.title}</> : <>Prev</>}
  //       </button>
  //       <button onClick={next}
  //         style={nextButton?.style}
  //         disabled={buttonsState.showNextBtn ? false : true}>
  //         {nextButton && nextButton.title ? <>{nextButton.title}</> : <>Next</>}
  //       </button>
  //     </div>
  //   )

  return (
    <div style={{ display: 'flex', flexDirection: directionType === 'column' ? 'row' : 'column' }}>
      <Ol className={`multistep-progress-bar ${directionType === 'column' ? ColumnDirection : RowDirection}`} >{renderTopNav()}</Ol>
      {/* <Ol className={directionType === 'column' ? ColumnDirection : RowDirection}>{renderTopNav()}</Ol> */}
      {steps[activeStep].component}
      {/* <div>{renderButtonsNav(showNavButtons, props.prevButton, props.nextButton)}</div> */}
    </div>
  )
}