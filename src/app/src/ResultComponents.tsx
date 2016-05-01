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
            <span className={bemBlocks.item("po_cds")}>Issuing Organization:</span> {source.po_cds}<br/>
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
        <h3 className={bemBlocks.item("subtitle")}>
            <span className={bemBlocks.item("subtitle_item_key")}>Issuing Organization:</span> 
            <span className={bemBlocks.item("subtitle_item_val")}>{source.po_cds}</span> 
            <span className={bemBlocks.item("subtitle_item_key")}>Posting Date:</span>  
            <span className={bemBlocks.item("subtitle_item_val")}>{moment(source.posted_date,"YYYYMMDD").format("MM/DD/YYYY")}</span>
            <span className={bemBlocks.item("subtitle_item_key")}>Expiring Date:</span> 
            <span className={bemBlocks.item("subtitle_item_val")}>{moment(source.expiration_date,"YYYYMMDD").format("MM/DD/YYYY")}</span> 
            <span className={bemBlocks.item("subtitle_item_key")}>Activity Code:</span> 
            <span className={bemBlocks.item("subtitle_item_val")}>{source.activity_code}</span>
        </h3>
        <div className={bemBlocks.item("text")} dangerouslySetInnerHTML={{__html:"<span style='font-weight:bold'>Summary: </span>" + source.summary}}></div>
      </div>
    </div>
  )
}
