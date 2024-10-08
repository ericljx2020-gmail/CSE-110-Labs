import React from 'react';

type Props = {
    likes: string[],
    title: string,
    onToggleFavorite: (title: string) => void,
}

export function Favorite({ likes, title, onToggleFavorite }: Props) {
    const isLiked = likes.includes(title);

    const handleClick = () => {
        onToggleFavorite(title);
    };

    return (
        <button onClick={handleClick}>
            {isLiked ? '❤️' : '🤍'}
        </button>
    );
}