import React from "react";
import matchSorter from 'match-sorter'

import ReactTable from "react-table";
import "react-table/react-table.css";
import axios from "axios";

class PizzaApp extends React.Component {
  constructor() {
    super();
    this.state = {
      pizzas:[],
      filtered: [],
      filterAll: '',
      checked: []
    };
    this.filterAll = this.filterAll.bind(this);
  }

  componentDidMount() {
    axios.get('db.json')
    .then(response => 
        this.setState({
       pizzas:response.data.pizzas
    })
    )
    .catch( (error)=> {
    console.log(error);
  });
 }
  

  onFilteredChange(filtered) {
    if (filtered.length > 1 && this.state.filterAll.length) {
      const filterAll = '';
      this.setState({ filtered: filtered.filter((item) => item.id != 'all'), filterAll })
    }
    else
      this.setState({ filtered });
  }

  filterAll(e) {
    const { value } = e.target;
    const filterAll = value;
    const filtered = [{ id: 'all', value: filterAll }];
    this.setState({ filterAll, filtered });
  }

  render() {
    return (
      <div>
        <input className="col-md-6 mb-3" placeholder="Search your item..." value={this.state.filterAll} onChange={this.filterAll} />
        <ReactTable
          getTrProps={(state,rowInfo)=>{}}

          filtered={this.state.filtered}

          ref={r => this.reactTable = r}
          onFilteredChange={this.onFilteredChange.bind(this)}
          data={this.state.pizzas}
          defaultFilterMethod={(filter, row) =>
          String(row[filter.id]) === filter.value}
          columns={[
            {
                Header: "Name",
                accessor: "name",
                filterMethod: (filter, row) => {
                return row[filter.id].includes(filter.value);
                }
            },
            {
              Header: "Type",
              accessor: "type",
              },
            {
              Header: "price",
              accessor:"price",
              id: 'all',
              resizable: false,
              sortable: false,
              filterMethod: (filter, rows) => {
                const result = matchSorter(rows, filter.value, {
                  keys: [
                    "name",
                  ], threshold: matchSorter.rankings.WORD_STARTS_WITH
                });
                return result;
              },
              filterAll: true,
            },

          ]}
          defaultPageSize={6}
          className="-striped -highlight"

          getTrProps={(state,rowInfo)=>{ 
            return {} 
          }}
        />
       
      </div>
    );
  }
}

export default PizzaApp;