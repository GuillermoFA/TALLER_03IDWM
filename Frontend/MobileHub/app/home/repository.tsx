import RepositoryScreen from "../../components/home/RepositoryScreen";


interface Props {
    repositoryName: string;
}

const Repository = ({ repositoryName }: Props) => {
    return <RepositoryScreen repositoryName={repositoryName} />;
};


export default Repository;