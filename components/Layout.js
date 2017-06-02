import React from 'react'

export default function Layout({head, side, body, foot}) {
    return (
        <div className="layout">
            <header className="head">{head}</header>
            <div className="middle">
                <aside className="side">{side}</aside>
                <div className="body">{body}</div>
            </div>
            <footer className="foot">{foot}</footer>
            <style>{`
                .layout {
                    display: flex;
                    flex-direction: column;
                }
                header.head {
                    height: 140px;
                    background: #eee;
                }
                .middle {
                    flex-grow: 2;
                    display: flex;
                    flex-direction: row;
                    padding: 10px 0;
                }
                aside.side {
                    width: 40%;
                }
                div.body {
                    flex-grow: 2;
                }
                footer.foot {
                    background: #eee;
                }
            `}</style>
        </div>
    )
}
