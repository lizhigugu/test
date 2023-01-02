// my functional component import
import BasicCard from "../components/BasicCard";

function ObjectCards() {

    return(
        <>
        {['1', "2", "3", "4"].map((value) => (
            <div key={value}>
                <BasicCard />
            </div>
        ))}
        </>
    )

}

export default ObjectCards;