import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './ItemView.module.css';

export const ItemView = ({ node, level = 1, activeID, onItemClick }) => {
    const [isOpen, setIsOpen] = useState(false);
    const hasChild = node?.children && node?.children.length > 0;

    const marginLeft = 20 * level;

    const handleFolderClick = (e) => {
        if (e.target === e.currentTarget) {
            if (node.type === 'folder') {
                setIsOpen((prev) => !prev);
            }

            onItemClick(node);
        }
    };

    const isActive = activeID === node?.id;

    const itemViewClasses = [styles.item];

    if (isActive) {
        itemViewClasses.push(styles.itemActive);
    }

    // console.log('active', activeID);
    // console.log('node', node?.id);

    return (
        <div className={styles.itemMarginShift}>
            <div
                onClick={handleFolderClick}
                className={itemViewClasses.join(' ')}
            >
                {node?.type === 'folder' && hasChild && (!isOpen ? '➡️' : '⬇️')}
                {node?.type === 'folder' ? '📁' : '📄'}
                {node?.name}
            </div>

            {isOpen &&
                hasChild &&
                node?.children.map((child) => (
                    <div
                        style={{ marginLeft: `${marginLeft}px` }}
                        key={child?.id}
                    >
                        <ItemView
                            node={child}
                            onItemClick={onItemClick}
                            activeID={activeID}
                            level={level + 1}
                        />
                    </div>
                ))}
        </div>
    );
};

ItemView.propTypes = {
    node: PropTypes.object,
    level: PropTypes.number,
    activeID: PropTypes.string,
    onItemClick: PropTypes.func,
};
