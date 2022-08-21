import React from 'react';
import { createStyles } from '@mantine/core';

import { useIntersection, useViewportSize } from '@mantine/hooks'

const useContaienrStyles = createStyles((theme, {height, isVisible}: {height: Number, isVisible: Boolean}) => ({

    'container': {
        display: 'flex',
        flexFlow: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        position: 'fixed',
        width: '90%',
        padding: '0.3rem 0',
        background: theme.colors.dark[6],
        boxShadow: theme.shadows.md,
        borderRadius: theme.radius.md,
        top: `calc(${height}px - ${isVisible ? 5 : 7}rem)`,
        left: '5%',

        'a': {
            'button': {
                height: '3rem',
                width: '3rem',
                color: theme.colors.dark[3]
            },

            '&.active': {
                borderBottom: `0.2rem solid ${theme.colors[theme.colorScheme][0]}`,
                'button': {
                    color: theme.white
                    
                 }
            }
        },

        [`@media (min-width: ${theme.breakpoints.sm}px)`]: {
            width: '50%',
            left: 'unset',
            right: '5%'
        },

        [`@media (min-width: ${theme.breakpoints.md}px)`]: {
            flexFlow: 'column-reverse',
            alignItems: 'center',
            justifyContent: 'flex-end',
            width: '3rem',
            height: '100%',
            borderRadius: '0',
            left: '0',
            top: '0',

            'a': {
                '&.active': {
                    borderBottom: 'none',
                    borderLeft: `0.2rem solid ${theme.colors[theme.colorScheme][0]}`
                }
            }
        }

    }
}))

const NavContainer = ({ children }) => {
    const {ref, entry} = useIntersection();
    const {height} = useViewportSize();
    
    const { classes } = useContaienrStyles({height, isVisible: entry?.isIntersecting});

    return (
        <nav ref={ref} className={classes.container}>
            {children}
        </nav>
    )
}

export default NavContainer;