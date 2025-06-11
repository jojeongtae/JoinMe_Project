import {useDispatch, useSelector} from "react-redux";
import {matchingInfo} from "../mainSlice";
import {useEffect} from "react";

export default function MBTI() {
    const dispatch = useDispatch();
    const mbtiList = useSelector(state => state.main.matchingInfo);

    useEffect(() => {
        dispatch(matchingInfo());
    }, [dispatch]);

    return (
        <>
            <section id={"mbti"}>
                <h2>MBTI 궁합</h2>
                <ul>
                    {mbtiList.map(match => (
                    <li key={match.num}>
                        <h3>{match.male.mbti} 💕 {match.female.mbti}</h3>
                        <p>{match.mbtiResult}</p>
                    </li>
                    ))}
                </ul>
            </section>
        </>
    );
}