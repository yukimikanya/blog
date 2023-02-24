import Link from 'next/link';

export const Pagination = ({ totalCount,currentPage }) => {
  const PER_PAGE = 9;
  const pageNumbers = [];
  const cp = currentPage;
  const totalPages = Math.ceil(totalCount / PER_PAGE);

  for (let i = Math.max(currentPage - 1, 1); i <= Math.min(currentPage + 1, Math.ceil(totalCount / PER_PAGE)); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className='page'>
      <ul className='pn-wrapper'>
        <li className="pn-guide">
        <Link href={`/blog/page/1`}><p>«</p></Link>
        </li>
        {pageNumbers.map((number, index) => (
          <li key={index} className="pn-name">
            <Link href={`/blog/page/${number}`}><p>{number}</p></Link>
          </li>
        ))}
        <li className="pn-guide">
        <Link href={`/blog/page/${totalPages}`}><p>»</p></Link>
        </li>
      </ul>
      <p className="page-count">{cp}ページ目</p>
    </div>
  );
};
