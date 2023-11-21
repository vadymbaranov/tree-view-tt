import { useState, useCallback, useMemo } from 'react';
import styles from './TreeView.module.css';
import DATA from '../../constants/response.json';
import { Search } from '../Search/Search';
import { debounce } from '../../helpers/debounce';
import { ItemView } from '../ItemView';

export const TreeView = () => {
    const [data, setData] = useState(DATA);
    const [query, setQuery] = useState('');
    const [appliedQuery, setAppliedQuery] = useState('');
    const [activeID, setActiveID] = useState(null);
    const [currentUser, setCurrentUser] = useState('All');

    const applyQuery = debounce(setAppliedQuery, 500);

    const handleQueryChange = useCallback(
        (event) => {
            setQuery(event?.target?.value);
            applyQuery(event?.target?.value);
        },
        [applyQuery]
    );

    const handleItemClick = (node) => setActiveID(node.id);

    const visibleData = useMemo(() => {
        return data.filter((item) => {
            if (currentUser !== 'All' && item?.authorization !== currentUser) {
                return false;
            }

            return item?.name
                .toLocaleLowerCase()
                .includes(appliedQuery?.toLocaleLowerCase());
        });
    }, [data, appliedQuery, currentUser]);


    console.log('active', activeID);
    return (
        <div>
            <Search
                query={query}
                onQueryChange={handleQueryChange}
            />
            <div className={styles.tree_users}>
                <button onClick={() => setCurrentUser('user1')}>User 1</button>
                <button onClick={() => setCurrentUser('user2')}>User 2</button>
                <button onClick={() => setCurrentUser('All')}>All</button>
            </div>

            {visibleData.length > 0 ? (
                <>
                    {visibleData?.map((node) => (
                        <div
                            className={styles.tree_item}
                            key={node?.id}
                        >
                            <ItemView
                                node={node}
                                activeID={activeID}
                                onItemClick={handleItemClick}
                            />
                        </div>
                    ))}
                </>
            ) : (
                <p>No folders/files with this name</p>
            )}
        </div>
    );
};
