import React, { useState } from "react";

enum ParamTypes {
  string = 'string',
  int = 'integer',
  enum = 'enum'
}

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
   //colors: Color[];
}
interface Props {
   params: Param[];
   model: Model;
}
class ParamEditor extends React.Component<Props> {

  public props:Props;

  constructor(props: Props){
    super(props);
    this.props = props;
  }

   public getModel(): Model {
    return this.props.model
   }

   public consoleLogModel(): void {
     console.log(this.getModel());
   }

   render(): React.ReactNode {

      //this.consoleLogModel();

      const inputs = this.props.model.paramValues.map(el=>{
          const relatedParam = this.props.params.find(el2=>el2.id==el.paramId)?.type;
          return <Input relatedParam={relatedParam} params={this.props.params} el={el} />
      });

      return (
         <div>
           <form action="">
             <h1>first h1</h1>
              {inputs}
              <input type="submit" value="submit"/> 
           </form>
         </div>
      );
   }
}


interface Input {
  relatedParam: string | undefined,
  params : Param[];
  el: ParamValue
}

const Input:React.FC<Input> = ({relatedParam, params, el}) => {

  const [value, setValue] = useState(el.value);

  const changeValue = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
      setValue(event.target.value);
  }

  let type;

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

  let resultInput;

  if (type == 'text' || type == 'number'){
            
    const labelName = params.find((el2:any)=>el.paramId==el2.id)?.name;
    resultInput = (
      <div className="">
          <label htmlFor={String(el.paramId)}>{labelName}</label>
          <input onChange={changeValue} key={el.paramId} id={String(el.paramId)} type={type} value={value} />
      </div>
    )
  }

  if (type == 'select'){
    const labelName = params.find((el2:any)=>el.paramId==el2.id)?.name;
    resultInput = (
      <div className="">
          <label htmlFor={String(el.paramId)}>{labelName}</label>
          <select onChange={changeValue} key={el.paramId} id={String(el.paramId)} value={value}>
            <option>1</option>
            <option>age</option>
            <option>name</option>
          </select>
      </div>
    )
  }

  return <>{resultInput}</>
}



export const App: React.FC = () => {
    const params = [
        { "id": 1, "name": "Назначение", type: ParamTypes.string }, 
        { "id": 2, "name": "Длина", type: ParamTypes.string },
        { "id": 3, "name": "opt", type: ParamTypes.enum },
    ];
    const model = {
      paramValues: [ 
        { "paramId": 1, "value": "повседневное" }, 
        { "paramId": 2, "value": "макси" },
        { "paramId": 3, "value": "age" }
      ]
     //colors: Color[]; ;
    };
  
  return (
    <React.Fragment>
      <ParamEditor params={params} model={model} />
    </React.Fragment>
  );
};

