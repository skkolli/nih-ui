import * as React from "react";
import {
  SearchBox,
  Hits,
  HierarchicalRefinementFilter,
  Pagination,
  ResetFilters,
  SelectedFilters,
  SearchkitComponent,
  HitsStats,
  SearchkitManager,
  SearchkitProvider,
  NoHits,
  InitialLoader
} from "searchkit";

import "./../styles/customisations.scss";
import "searchkit/theming/theme.scss";

const TaxonomyHitsItem = (props)=> {
  const {result, bemBlocks} = props
  return (
    <div className={bemBlocks.item().mix(bemBlocks.container("item"))}>
      {result._source.name}
    </div>
  )
}

export class TaxonomyApp extends React.Component<any, any> {

  searchkit:SearchkitManager

  constructor() {
    super()
    const host = "http://demo.searchkit.co/api/taxonomy"
    this.searchkit = new SearchkitManager(host)
  }

  render(){ return (
    <div>
    <SearchkitProvider searchkit={this.searchkit}>
    <div className="sk-layout">

      <div className="sk-layout__top-bar sk-top-bar">
        <div className="sk-top-bar__content">
          <div className="my-logo">Searchkit Acme co</div>
          <SearchBox
            translations={{"searchbox.placeholder":"search regions"}}
            queryOptions={{"minimum_should_match":"70%"}}
            autofocus={true}
            searchOnChange={true}
            queryFields={["title^5"]}/>
        </div>
      </div>

      <div className="sk-layout__body">

  			<div className="sk-layout__filters">
          <HierarchicalRefinementFilter field="taxonomy" id="categories" title="Region" startLevel={2}/>
  			</div>

        <div className="sk-layout__results sk-results-list">

          <div className="sk-results-list__action-bar sk-action-bar">

            <div className="sk-action-bar__info">
              <HitsStats/>
            </div>

            <div className="sk-action-bar__filters">
              <SelectedFilters/>
              <ResetFilters/>
            </div>
          </div>

  				<Hits hitsPerPage={10} mod="sk-hits-list" itemComponent={TaxonomyHitsItem}/>
          <NoHits/>
          <InitialLoader/>
  				<Pagination showNumbers={true}/>
        </div>
			</div>
			<a className="view-src-link" href="https://github.com/searchkit/searchkit-demo/blob/master/src/app/src/TaxonomyApp.tsx">View source »</a>
		</div>
    </SearchkitProvider>
    </div>
	)}

}
