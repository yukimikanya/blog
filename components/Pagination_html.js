import Link from 'next/link';

export const Pagination = ({ totalCount }) => {
  const PER_PAGE = 6;

  const range = (start, end) =>
        [...Array(end - start + 1)].map((_, i) => start + i)

  return (
    <ul className='pn-wrapper'>
      {range(1, Math.ceil(totalCount / PER_PAGE)).map((number, index) => (
        <li key={index} className="pn-name">
          <Link href={`/category/cxiw_5fpfzp/${number}`}><p>{number}</p></Link>
        </li>
      ))}
    </ul>
  );
};