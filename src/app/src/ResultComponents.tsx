import * as React from "react";
import * as _ from "lodash";

var moment = require('moment');
var map = require('lodash/map');

export const GrantHitsGridItem = (props)=> {
  const {bemBlocks, result} = props
  let url = result._source.grant_url
  const source:any = _.extend({}, result._source, result.highlight)
  return (
    <div className={bemBlocks.item().mix(bemBlocks.container("item"))} data-qa="hit">
      <a href={url} target="_blank">        
        <div data-qa="title" className={bemBlocks.item("title")} dangerouslySetInnerHTML={{__html:source.title}}>        
        </div>        
      </a>
      <div className={bemBlocks.item("subtitle")}>
            Issuing Organization: {source.po_cds}<br/>
            Posting Date: {source.posted_date}<br/>
            Expiring Date: {source.expiration_date}<br/>
            Activity Code: {source.activity_code}   
      </div>      
    </div>    
  )
}

export const GrantHitsListItem = (props)=> {
  const {bemBlocks, result} = props
  let url = result._source.grant_url
  const source:any = _.extend({}, result._source, result.highlight)
  return (
    <div className={bemBlocks.item().mix(bemBlocks.container("item"))} data-qa="hit">      
      <div className={bemBlocks.item("details")}>
        <a href={url} target="_blank"><h2 className={bemBlocks.item("title")} dangerouslySetInnerHTML={{__html:source.title}}></h2></a>
        <h3 className={bemBlocks.item("subtitle")}>Issuing Organization: {source.po_cds}, Posting Date: {moment(source.posted_date,"YYYYMMDD").format("MM/DD/YYYY")}, Expiring Date: {moment(source.expiration_date,"YYYYMMDD").format("MM/DD/YYYY")}, Activity Code: {source.activity_code}</h3>
        <div className={bemBlocks.item("text")} dangerouslySetInnerHTML={{__html:"Summary: " + source.summary}}></div>
      </div>
    </div>
  )
}
