import { useRef } from 'react';

export const useNavbarRef = () => {
    const navRef = useRef(null);
    return navRef;
};
