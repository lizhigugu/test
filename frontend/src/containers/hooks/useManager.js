//react import

//mui import

//function

const Managers =[
    {
        name: "Yishin",
        id: "B10901121"
    },
    {
        name: "Cs",
        id: "B10901099"
    }, 
    {
        name: "LZT",
        id: "B10901099"
    }

]


const useManager = () => {
    let ifManager =false;

    const checkManager = (input_name, id) => {
        const getName = Managers.find(({name})=>(name===input_name));
        if(!getName){
           return false
        }
        if(getName.id === id){
            ifManager=true;
            return true
        }
        else{
            return false
        }

    }

    return{
        ifManager, checkManager
    }

}

export default useManager;


