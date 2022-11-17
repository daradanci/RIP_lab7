import { useHistory } from "react-router-dom";

export const BackButton = () => {
    let history = useHistory();
    return (
        <div className={'back_button'}>
            <button onClick={() => history.goBack()}>Назад</button>
        </div>
    );
};

export default BackButton;