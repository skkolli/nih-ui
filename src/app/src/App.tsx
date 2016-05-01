import * as React from "react";
import * as _ from "lodash";
const BEMBlock = require("bem-cn")

import {
  SearchBox,
  Hits,
  HitsStats,
  RefinementListFilter,
  Pagination,
  ResetFilters,
  MenuFilter,
  SelectedFilters,
  HierarchicalMenuFilter,
  NumericRefinementListFilter,
  SortingSelector,
  SearchkitComponent,
  SearchkitProvider,
  SearchkitManager,
  NoHits,
  RangeFilter,
  InitialLoader,
  ViewSwitcherToggle,
  ViewSwitcherHits,
  Layout, LayoutBody, LayoutResults,
  SideBar, TopBar,
  ActionBar, ActionBarRow,
  TagCloud, Select, ItemList,
  DynamicRangeFilter, RangeSliderHistogram,
  ItemHistogramList, PageSizeSelector, Toggle
} from "searchkit";

import "./../styles/customisations.scss";
import "searchkit/theming/theme.scss";

import {GrantHitsGridItem, GrantHitsListItem} from "./ResultComponents"


export class App extends React.Component<any, any> {

  searchkit:SearchkitManager

  constructor() {
    super()
    const host = "http://localhost:9200/nih/grant"
    this.searchkit = new SearchkitManager(host)
    this.searchkit.translateFunction = (key)=> {
      return {"pagination.next":"Next Page", "pagination.previous":"Previous Page"}[key]
    }
  }

  
  render(){

    return (
      <SearchkitProvider searchkit={this.searchkit}>
        <Layout size="l">
          <TopBar>
            <div className="my-logo">NIH Grants</div>
            <SearchBox
              translations={{"searchbox.placeholder":"Search Grants ..."}}
              queryOptions={{"minimum_should_match":"70%"}}
              autofocus={true}
              searchOnChange={true}
              prefixQueryFields={["text^1","title^2", "issuing_org", "po_cds", "activity_code","cpo_cds", "summary"]}/>
          </TopBar>

          <LayoutBody>

      			<SideBar>
      				<HierarchicalMenuFilter fields={["po_cds"]} title="Participating Organizations" id="components" size={10}/>              
              <MenuFilter field="grant_types" title="Grant Types" id="grantTypes" size={10} listComponent={ItemHistogramList}/>
              <RefinementListFilter id="cpos" title="Components of Participating Organizations" field="cpo_cds" operator="OR" size={10}/>
              <MenuFilter field="activity_code" title="Activity Codes" id="tag-cloud" listComponent={Select}/>              
              <MenuFilter field="cpo_cds" title="Tag Cloud" id="tag-cloud" listComponent={TagCloud} size={10}/>
            </SideBar>

      			<LayoutResults>

              <ActionBar>

                <ActionBarRow>          				
                  <HitsStats/>
                  <ViewSwitcherToggle/>
          				<SortingSelector options={[
          					{label:"Relevance", field:"_score", order:"desc",defaultOption:true},
          					{label:"Latest Releases", field:"posted_date", order:"desc"},
          					{label:"Earliest Releases", field:"posted_date", order:"asc"}
          				]}/>
                  <PageSizeSelector options={[5,10,25,50,100]} listComponent={Select}/>
                </ActionBarRow>
                <ActionBarRow>
                  <SelectedFilters/>
                  <ResetFilters/>
                </ActionBarRow>

              </ActionBar>

              <ViewSwitcherHits
      				    hitsPerPage={5} highlightFields={["title","summary"]}
                  sourceFilter={["title", "issuing_org", "po_cds","activity_code", "posted_date", "expiration_date", "grant_url", "announcement_number","summary"]}
                  hitComponents = {[
                    {key:"list", title:"List", itemComponent:GrantHitsListItem, defaultOption:true},
                    {key:"grid", title:"Grid", itemComponent:GrantHitsGridItem}                    
                  ]}
                  scrollTo="body"
              />

              <NoHits translations={{
                "NoHits.NoResultsFound":"No Grants found were found for {query}",
                "NoHits.DidYouMean":"Search for {suggestion}",
                "NoHits.SearchWithoutFilters":"Search for {query} without filters",
                "NoHits.NoResultsFoundDidYouMean": "No Grants found for {query}. Did you mean {suggestion}?"
              }} suggestionsField={"summary"}/>

              <InitialLoader/>
      				<Pagination showNumbers={true}/>
      			</LayoutResults>
          </LayoutBody>
    		</Layout>
      </SearchkitProvider>
	)}

}
