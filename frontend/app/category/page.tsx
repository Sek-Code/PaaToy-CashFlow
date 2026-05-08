import React from 'react'

type Props = {}

export default function Category({}: Props) {
    return (
      <div>
            <div>รายรับ-รายจ่ายตามประเภท</div>
            <div id="รายจ่าย">
            <div>รายจ่าย</div>
            </div>
            <div id="รายรับ">
            <div>รายรับ</div>
            </div>
            <div>ยอดคงเหลือ</div>
      </div>
    );
}