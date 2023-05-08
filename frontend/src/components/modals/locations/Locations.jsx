import React from 'react'
import style from "./Locations.module.css"

export default function Locations() {
  return (
    <div className={style.container}>
      <div className={style.menu}>
        <button className={style.menuItem}>新しいロケーション</button>
        <button className={style.menuItem}>格納する</button>
        <button className={style.menuItem}>ロケーション一覧</button>
        <button className={style.menuItem}>移動履歴</button>
      </div>
      <div className={style.display}>locations</div>
    </div>
  )
}
