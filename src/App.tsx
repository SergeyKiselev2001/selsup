import React, { useState } from "react";
import styled, { keyframes } from 'styled-components';

///////////////// INTERFACES /////////////////

interface Param {
  id: number;
  name: string;
  type: ParamTypes;
}
interface ParamValue {
   paramId: number;
   value: string;
}
interface Model {
   paramValues: ParamValue[];
}
interface Props {
   params: Param[];
   model: Model;
}
interface Input {
  relatedParam: string | undefined,
  params : Param[];
  el: ParamValue
}
interface AddBlockProps {
  pressButton: boolean
}
interface SelectModelTypeProps {
  setCurrentSelect: any
}
interface SelectModelButtonProps {
  position: string
}

///////////////// ENUMS /////////////////

enum ParamTypes {
  null = 'null',
  string = 'string',
  int = 'integer',
  enum = 'enum'
}

///////////////// STYLES /////////////////

//////// APP ////////// 

const Content = styled.div`
  margin: 0 auto;
  width: fit-content;
  display: flex;
`;

const AppWrapper = styled.div`
  padding-top: 200px;
  width: 100%;
  height: calc(100vh - 200px);
  background-color: #e6e6e6;
`;

///// RIGHT BLOCK ///// 

const AddBlock = styled.div<AddBlockProps>`
    height: ${props=> props.pressButton ? "300px" : "100px"};
    position: relative;
    transition:.3s;
    width: 400px;
    background-color: #ffffff;
    box-shadow: 0 0 10px 2px rgba(0,0,0,0.1);
    margin-right: 20px;
    border-radius: 10px;
    &:hover {
      box-shadow: 0 0 15px 5px rgba(0,0,0,0.2);
    }
`;

const AddButton = styled.button`
    font-weight: 700;
    font-family: 'Open Sans Condensed', sans-serif;
    position: absolute;
    margin-left: 50%;
    transform: translateX(-50%);
    top: 25px;
    z-index: 1;
    outline: none;
    border: none;
    box-shadow: 0 0 10px 2px rgba(0,0,0,0.2);
    height: 50px;
    width: 50px;
    border-radius: 50%;
    cursor: pointer;
    background: rgb(215,59,59);
    background: linear-gradient(159deg, #c96060 0%, rgba(173,16,170,1) 100%);
    color: white;
    font-size: 24px;
    &:hover {
      box-shadow: 0 0 15px 5px rgba(0,0,0,0.2);
    }

    &:active {
      box-shadow: inset 0 0 15px 5px rgba(0,0,0,0.2);
    }
`;

const Opacity_0_to_1 = keyframes`  
    from { opacity: 0 }
    to { opacity: 1} 
`;

const Animation1 = keyframes`  
    from { top: 25px; left: 0px; }
    to { top: 70px; left: -45px;} 
`;

const Animation2 = keyframes`  
   from { top: 25px; }
   to { top: 100px; }
`;

const Animation3 = keyframes`  
    from { top: 25px; left: 0px; }
    to { top: 70px; left: 45px;} 
`;

const SelectModelButton = styled.button<SelectModelButtonProps>`
  font-family: 'Open Sans Condensed', sans-serif; 
  font-weight: 700;
  display: block;
  position: absolute;
  margin-left: 50%;
  transform: translateX(-50%);


  top: ${props=>{switch(props.position){
    case "1":
      return "70px";
      break;
    case "2":
      return "100px";
      break;
    case "3":
      return "70px";
      break;
  }}};

  left: ${props=>{switch(props.position){
    case "1":
      return "-45px";
      break;
    case "2":
      return "0px";
      break;
    case "3":
      return "45px";
      break;
  }}};
  z-index: 0;

  outline: none;
  border: none;
  box-shadow: 0 0 10px 2px rgba(0,0,0,0.2);
  height: 45px;
  width: 45px;
  border-radius: 50%;
  cursor: pointer;
  background: rgb(215,59,59);
  background: linear-gradient(159deg, #9c4343 0%, #853183 100%);
  color: white;
  font-size: 14px;
  &:hover {
    box-shadow: 0 0 15px 5px rgba(0,0,0,0.2);
  }

  &:active {
    box-shadow: inset 0 0 15px 5px rgba(0,0,0,0.2);
  }

  animation: ${props=>{switch(props.position){
    case "1":
      return Animation1;
      break;
    case "2":
      return Animation2;
      break;
    case "3":
      return Animation3;
      break;
  }}} .5s ease ;
`;

const Submit = styled.button`
    font-family: 'Open Sans Condensed', sans-serif; 
    font-weight: 700;
    height: 40px;
    width: 200px;
    margin: 0 auto;
    display: block;
    animation: ${Opacity_0_to_1} 1s ease;
    background-color: black;
    color: white;
    border-radius: 3px;
    border: none;
    outline: none;
    cursor: pointer;

    &:hover {
      background-color: #4d4d4d;
      color: white;
    }
    &:active {
      background-color: #b3b3b3;
      color: #020202;
      box-shadow: inset 0 0 10px 5px rgba(0,0,0,0.2);
    }
`;

const InputLabel = styled.label`
    text-align: center;
    margin-top: 90px;
    display: block;
    animation: ${Opacity_0_to_1} .5s ease;
`;

const InputParam = styled.input`
    margin: 0 auto;
    display: block;
    border: none;
    outline: none;
    height: 30px;
    width: 300px;
    font-family: 'Open Sans Condensed', sans-serif; 
    font-size: 16px;
    padding-left: 10px;
    margin-bottom: 10px;
    border-radius: 10px;
    background-color: #dadada;
    animation: ${Opacity_0_to_1} 1.5s ease;

   &:focus {
      background-color: #ffffff;
      box-shadow: 0px 0px 10px 2px rgba(0,0,0,0.2);
  }
`;

const CurrentSelectSpan = styled.span`
  display: block;
  height: 60px;
  padding: 10px;
  font-size: 18px;
  text-decoration: underline;
`;

///// LEFT BLOCK //////  

const ParamEditorBlock = styled.div`

    width: 450px;
    min-height: 300px;
    background-color: #acacac;
    border-radius: 10px;
    padding: 15px;
    padding-left: 25px;
    transition: .5s;
    box-shadow: 0 0 10px 2px rgba(0,0,0,0.1);

    &:hover {
        box-shadow: 0 0 15px 5px rgba(0,0,0,0.2);
    }
`;

const SubmitParam = styled.button`
    font-family: 'Open Sans Condensed', sans-serif; 
    font-weight: 700;
    font-size: 14px;
    width: 200px;
    height: 30px;
    display: block;
    margin: 0 auto;
    margin-top: 30px;
`;

const EditInputLabel = styled.label`
    margin-left: 30px;
    display: inline-block;
    width: 100px;
`;

const EditInput = styled.input`
    font-family: 'Open Sans Condensed', sans-serif; 
    font-size: 16px;
    border:none;
    outline: none;
    background-color: #cecece;
    border-radius: 10px;
    padding-left: 10px;
    height: 30px;
    width: 200px;
    margin-top: 3px;
    margin-bottom: 3px;
    
    box-shadow: 0 0 10px 2px rgba(0,0,0,0.1);

    &:focus {
      background-color: #ffffff;
    }
`;

const EditSelect = styled.select`
    font-family: 'Open Sans Condensed', sans-serif; 
    font-size: 16px;
    border:none;
    outline: none;
    background-color: #cecece;
    border-radius: 10px;
    padding-left: 10px;
    height: 30px;
    width: 212px;
    margin-bottom: 3px;
    margin-top: 3px;
    &:focus {
      background-color: #ffffff;
    }
`;

interface TypeSpanProps {
  color: string;
}

const TypeSpan = styled.span<TypeSpanProps>`
    color: ${props=>{
      switch (props.color){
        case 'text':
          return '#004aac;';
          break;
        case 'number':
          return '#006961;';
          break;
        case 'select':
          return '#5f1937;';
          break;
      }
    }}; 
    font-weight: 700;
    display: inline-block;
    width: 64px;
    margin-left: 0px;
    text-align: center;
`;

const Delete = styled.button`
  opacity: 0;
  display: inline-block;
  width: 14px;
  height: 14px;
  text-align: center;
  border-radius: 50%;
  border: none;
  outline: none;
  padding: 0px;
  margin-left: 4px;
  font-size: 8px;
  font-weight: 700;
  transform: translateY(-3px);
  cursor: pointer;
  &:hover,:active {
    background-color: #7a0913;
    color: white;
  }
`;

const ParamRow = styled.div`
padding-left: 5px;
border-radius: 10px;
cursor: pointer;
  &:hover {
    background-color: #00000028;
  }

  &:hover ${Delete} {
    opacity: 1;
  }
`;

///////////////// COMPONENTS /////////////////


class ParamEditor extends React.Component<Props> {

  public props:Props;

  constructor(props: Props){
    super(props);
    this.props = props;
  }

   public getModel(): Model {
    return this.props.model;
   }

   public consoleLogModel(): void {
     console.log(this.getModel());
   }

   render(): React.ReactNode {
      const inputs = this.props.model.paramValues.map(el=>{
          const relatedParam = this.props.params.find(el2=>el2.id==el.paramId)?.type;
          return <Input relatedParam={relatedParam} params={this.props.params} el={el} />
      });

      return (
        <ParamEditorBlock>
            <form action="">
              <h1>Product info</h1>
                {inputs}
                <SubmitParam type="submit" value="submit">Отправить</SubmitParam>
            </form>
        </ParamEditorBlock>
      );
   }
}



const Input:React.FC<Input> = ({relatedParam, params, el}) => {

  const [value, setValue] = useState(el.value);
  const changeValue = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
      setValue(event.target.value);
  }

  let type;
  let resultInput;

  switch (relatedParam) {
      case ParamTypes.string:
          type="text";
          break;
      case ParamTypes.int:
          type="number";
          break;
      case ParamTypes.enum:
          type="select"
          break;
  }

  if (type == 'text' || type == 'number'){
            
    const labelName = params.find((el2:any)=>el.paramId==el2.id)?.name;
    resultInput = (
      <ParamRow>
          [<TypeSpan color={type}>{type}</TypeSpan>]
          <EditInputLabel htmlFor={String(el.paramId)}>{labelName}</EditInputLabel>
          <EditInput onChange={changeValue} key={el.paramId} id={String(el.paramId)} type={type} value={value} />
          <Delete>x</Delete>
      </ParamRow>
    )
  }

  if (type == 'select'){
    const labelName = params.find((el2:any)=>el.paramId==el2.id)?.name;
    resultInput = (
      <ParamRow>
          [<TypeSpan color={type}>{type}</TypeSpan>]
          <EditInputLabel htmlFor={String(el.paramId)}>{labelName}</EditInputLabel>
          <EditSelect onChange={changeValue} key={el.paramId} id={String(el.paramId)} value={value}>
            <option>red</option>
            <option>green</option>
            <option>blue</option>
          </EditSelect>
          <Delete>x</Delete>
      </ParamRow>
    )
  }

  return <>{resultInput}</>
}



export const AddParam:React.FC<any> = ({addParam}) => {

  const [pressButton, setPressButton] = useState(false);
  const [currentSelect, setCurrentSelect] = useState(ParamTypes.null);

  const [inputText, setInputText] = useState('');
  const inputChange = (value:string) => {
    setInputText(value);
  }

  const click = () => {
    setPressButton(!pressButton);
    setCurrentSelect(ParamTypes.null);
  }

  const add = () => {
    setInputText('');
    addParam(inputText, currentSelect);
  }

  return (
    <AddBlock pressButton={pressButton}>
      <CurrentSelectSpan>{currentSelect}</CurrentSelectSpan>
      <AddButton onClick={click}>+</AddButton>
      {
        pressButton && <SelectModelType setCurrentSelect={setCurrentSelect}/>
      }
      {
        currentSelect != ParamTypes.null && <AddParamInput inputText={inputText} setInputText={setInputText}/>
      }
      {
        currentSelect !=ParamTypes.null && <Submit disabled={!inputText} onClick={add}>Добавить</Submit>
      }
    </AddBlock>
  )
}


const SelectModelType:React.FC<SelectModelTypeProps> = ({setCurrentSelect}) => {
  const select = (val:ParamTypes) => setCurrentSelect(val);

  return (
    <>
      <SelectModelButton onClick={()=>select(ParamTypes.string)} position="1">"Ab"</SelectModelButton>
      <SelectModelButton onClick={()=>select(ParamTypes.int)} position="2">0..9</SelectModelButton>
      <SelectModelButton onClick={()=>select(ParamTypes.enum)} position="3">{`{ , , }`}</SelectModelButton>
    </>
  )
}



const AddParamInput:React.FC<any> = ({inputText, setInputText}) => {

  const inputChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  }
  return (
    <>
      <InputLabel htmlFor="inputParam">Введите название параметра</InputLabel>
      <InputParam onChange={inputChange} value={inputText} />
    </>
  )
}


export const App: React.FC = () => {
    const [params, setParams] = useState([
        { "id": 1, "name": "Назначение", type: ParamTypes.string }, 
        { "id": 2, "name": "Длина", type: ParamTypes.string },
        { "id": 3, "name": "Цвет", type: ParamTypes.enum },
        { "id": 4, "name": "Стоимость", type: ParamTypes.int },
    ]);

    const [model, setModel] = useState({
      paramValues: [ 
        { "paramId": 1, "value": "повседневное" }, 
        { "paramId": 2, "value": "макси" },
        { "paramId": 3, "value": "green"},
        { "paramId": 4, "value": "9999" }
      ]
     //colors: Color[]; ;
    });

    const addParam = (paramName:string, paramType:ParamTypes) => {
      const nextID = params.reduce((max, current)=>current.id>max?current.id:max, 0) + 1;
      setParams([...params , { "id": nextID, "name": paramName, type: paramType }]);
      setModel ( {...model, paramValues: [...model.paramValues, { "paramId": nextID, "value": "" }]});
    }
  return (
    <AppWrapper>
      <Content>
        <AddParam addParam={addParam}/>
        <ParamEditor params={params} model={model} />
      </Content>
    </AppWrapper>
  );
};