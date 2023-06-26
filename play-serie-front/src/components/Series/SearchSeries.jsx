function SearchSeries(props) {
  return (
    <div className="flex">
      <input value={props.search} onChange={(e) => props.onSearch(e.target.value)} className="py-2 px-3 rounded-sm border-none outline-none text-gray-600 font-semibold" type="text" placeholder="Pesquise sua série" />
    </div>
  );
}

export default SearchSeries;
