import React from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import { CodeIcon } from "@heroicons/react/outline";
import styled from "@emotion/styled";

import styles from "./index.module.css";

export const github = [
    {
        title: "bunni",
        href: "https://github.com/zeframlou/bunni",
        icon: CodeIcon,
    },
    {
        title: "gauge-foundry",
        href: "https://github.com/timeless-fi/gauge-foundry",
        icon: CodeIcon,
    },
    {
        title: "options-token",
        href: "https://github.com/timeless-fi/options-token",
        icon: CodeIcon,
    },
];

export const Guides = [
    {
        title: "What is Bunni?",
        text: "Read a general overview of Bunni",
        to: "./docs/intro",
    },
    {
        title: "Providing Liquidity & Earn oLIT",
        text: "Learn about how to provide liquidity on Uniswap via Bunni and earn gauge rewards",
        to: "./docs/guides/lp",
    },
    {
        title: "Tokenomics",
        text: "Understand how $LIT is used to incentivize long-term liquidity",
        to: "./docs/tokenomics/lit",
    },
];

const Row = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 16px;
    justify-content: center;
    margin: 0 auto;
    padding: 1rem 0;
    max-width: 960px;
    @media (max-width: 960px) {
        grid-template-columns: 1fr;
        padding: 1rem;
        max-width: 100%;
        margin: 0 1rem;
    }
    @media (max-width: 640px) {
        grid-template-columns: 1fr;
    }
`;

const TwoRow = styled(Row)`
    grid-template-columns: 1fr 1fr;
    grid-gap: 48px;
    @media (max-width: 960px) {
        grid-template-columns: 1fr;
    }
    @media (max-width: 640px) {
        grid-template-columns: 1fr;
    }
`;

const Card = styled.div`
    display: flex;
    max-height: 250px;
    min-width: 350px;
    padding: 1rem;
    flex-direction: column;
    justify-content: center;
    cursor: pointer;
    border: 1px solid transparent;
    border-radius: 20px;
    border: 1px solid var(--ifm-color-emphasis-200);
    /* flex: 1 1 0px; */
    &:hover {
        border: 1px solid var(--ifm-color-emphasis-400);
        box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.05);
    }
    @media (max-width: 960px) {
        width: 100%;
    }
`;

const LinkRow = styled.div`
    width: 100%;
    align-items: center;
    justify-content: space-between;
    display: flex;
    flex-direction: row;
    a h3 {
        color: black !important;
    }
`;

const StyledGithubIcon = styled.div`
    svg {
        fill: var(--ifm-font-color-base);
    }
`;

function HomepageHeader() {
    const { siteConfig } = useDocusaurusContext();
    return (
        <header className={clsx("hero hero--primary", styles.heroBanner)}>
            <div className="container">
                <h1 className="hero__title">{siteConfig.title}</h1>
                <p className="hero__subtitle">{siteConfig.tagline}</p>
            </div>
        </header>
    );
}

export default function Home(): JSX.Element {
    const { siteConfig } = useDocusaurusContext();
    return (
        <Layout
            title={`${siteConfig.title}`}
            description="Documentation of Bunni"
        >
            <HomepageHeader />
            <main>
                <TwoRow
                    style={{
                        gap: "56px",
                        marginTop: "4rem",
                    }}
                >
                    <div>
                        <h2>Getting Started</h2>
                        <p>
                            Explore these docs to start using Bunni.
                        </p>
                        <div>
                            {Guides.map((action) => (
                                <Link
                                    style={{ textDecoration: "none" }}
                                    key={action.title}
                                    to={action.to}
                                >
                                    <Card
                                        key={action.title}
                                        style={{ marginBottom: "1rem" }}
                                    >
                                        <LinkRow>
                                            <div
                                                style={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                }}
                                            >
                                                <h3
                                                    style={{
                                                        marginBottom: "0rem",
                                                    }}
                                                >
                                                    {action.title}
                                                </h3>
                                            </div>
                                            <svg
                                                style={{
                                                    width: "24px",
                                                    opacity: 0.2,
                                                }}
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z" />
                                            </svg>
                                        </LinkRow>
                                        <p style={{ marginBottom: "0rem" }}>
                                            {action.text}
                                        </p>
                                    </Card>
                                </Link>
                            ))}
                        </div>
                    </div>
                    <div>
                        <h2>Developer Links</h2>
                        <p>
                            The Bunni codebase is comprised of an ecosystem of
                            open source components.
                        </p>
                        {github.map((action) => (
                            <Link
                                style={{ textDecoration: "none" }}
                                href={action.href}
                            >
                                <Card
                                    key={action.title}
                                    style={{ marginBottom: "1rem" }}
                                >
                                    <LinkRow>
                                        <StyledGithubIcon
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                            }}
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 120.78 117.79"
                                                style={{ width: "24px" }}
                                            >
                                                <defs></defs>
                                                <title>testlogo</title>
                                                <g
                                                    id="Layer_2"
                                                    data-name="Layer 2"
                                                >
                                                    <g
                                                        id="Layer_1-2"
                                                        data-name="Layer 1"
                                                    >
                                                        <path
                                                            className="cls-1"
                                                            d="M60.39,0A60.39,60.39,0,0,0,41.3,117.69c3,.56,4.12-1.31,4.12-2.91,0-1.44-.05-6.19-.08-11.24C28.54,107.19,25,96.42,25,96.42c-2.75-7-6.71-8.84-6.71-8.84-5.48-3.75.41-3.67.41-3.67,6.07.43,9.26,6.22,9.26,6.22,5.39,9.23,14.13,6.57,17.57,5,.55-3.9,2.11-6.56,3.84-8.07C36,85.55,21.85,80.37,21.85,57.23A23.35,23.35,0,0,1,28.08,41c-.63-1.52-2.7-7.66.58-16,0,0,5.07-1.62,16.61,6.19a57.36,57.36,0,0,1,30.25,0C87,23.42,92.11,25,92.11,25c3.28,8.32,1.22,14.46.59,16a23.34,23.34,0,0,1,6.21,16.21c0,23.2-14.12,28.3-27.57,29.8,2.16,1.87,4.09,5.55,4.09,11.18,0,8.08-.06,14.59-.06,16.57,0,1.61,1.08,3.49,4.14,2.9A60.39,60.39,0,0,0,60.39,0Z"
                                                        />
                                                        <path
                                                            className="cls-2"
                                                            d="M22.87,86.7c-.13.3-.6.39-1,.19s-.69-.61-.55-.91.61-.39,1-.19.69.61.54.91Z"
                                                        />
                                                        <path
                                                            className="cls-2"
                                                            d="M25.32,89.43c-.29.27-.85.14-1.24-.28a.92.92,0,0,1-.17-1.25c.3-.27.84-.14,1.24.28s.47,1,.17,1.25Z"
                                                        />
                                                        <path
                                                            className="cls-2"
                                                            d="M27.7,92.91c-.37.26-1,0-1.35-.52s-.37-1.18,0-1.44,1,0,1.35.51.37,1.19,0,1.45Z"
                                                        />
                                                        <path
                                                            className="cls-2"
                                                            d="M31,96.27A1.13,1.13,0,0,1,29.41,96c-.53-.49-.68-1.18-.34-1.54s1-.27,1.56.23.68,1.18.33,1.54Z"
                                                        />
                                                        <path
                                                            className="cls-2"
                                                            d="M35.46,98.22c-.15.47-.82.69-1.51.49s-1.13-.76-1-1.24.82-.7,1.51-.49,1.13.76,1,1.24Z"
                                                        />
                                                        <path
                                                            className="cls-2"
                                                            d="M40.4,98.58c0,.5-.56.91-1.28.92s-1.3-.38-1.31-.88.56-.91,1.29-.92,1.3.39,1.3.88Z"
                                                        />
                                                        <path
                                                            className="cls-2"
                                                            d="M45,97.8c.09.49-.41,1-1.12,1.12s-1.35-.17-1.44-.66.42-1,1.12-1.12,1.35.17,1.44.66Z"
                                                        />
                                                    </g>
                                                </g>
                                            </svg>
                                            <h3
                                                style={{
                                                    marginBottom: "0rem",
                                                    marginLeft: "16px",
                                                }}
                                            >
                                                {action.title}
                                            </h3>
                                        </StyledGithubIcon>
                                        <svg
                                            style={{
                                                width: "24px",
                                                height: "24px",
                                                opacity: 0.2,
                                            }}
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z" />
                                        </svg>
                                    </LinkRow>
                                </Card>
                            </Link>
                        ))}
                    </div>
                </TwoRow>
            </main>
        </Layout>
    );
}
